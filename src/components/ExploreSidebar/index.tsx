import { useCallback, useState } from 'react';
import { Close, FilterList } from '@styled-icons/material-outlined';

import Heading from 'components/Heading';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Button from 'components/Button';

import * as S from './styles';
import MediaMatch from 'components/MediaMatch';

export type ItemProps = {
  title: string;
  name: string;
  type: 'checkbox' | 'radio';
  fields: Field[];
};

type Field = {
  label: string;
  name: string;
};

type Values = {
  [key: string]: boolean | string;
};

export type ExploreSideBarProps = {
  items: ItemProps[];
  initialValues?: Values;
  onFilter: (values: Values) => void;
};

const ExploreSidebar = ({
  items,
  initialValues = {},
  onFilter
}: ExploreSideBarProps) => {
  const [values, setValues] = useState(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilter = useCallback(() => {
    onFilter(values);
    setIsOpen(false);
  }, [values, onFilter]);

  const handleChange = useCallback((name: string, value: boolean | string) => {
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  }, []);

  return (
    <S.Wrapper isOpen={isOpen} aria-label="filters sidebar">
      <S.Overlay aria-hidden={isOpen} />

      <MediaMatch lessThan="medium">
        <S.IconWrapper>
          {!isOpen && (
            <FilterList
              aria-label="open filters"
              onClick={() => setIsOpen(true)}
            />
          )}

          {!!isOpen && (
            <Close
              aria-label="close filters"
              onClick={() => setIsOpen(false)}
            />
          )}
        </S.IconWrapper>
      </MediaMatch>

      <S.Content>
        {items.map((item) => (
          <S.Items key={item.name}>
            <Heading lineBottom lineColor="secondary" size="small">
              {item.title}
            </Heading>

            {item.type === 'checkbox' &&
              item.fields.map((field) => (
                <Checkbox
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  labelFor={field.name}
                  isChecked={!!values[field.name]}
                  onCheck={(value) => handleChange(field.name, value)}
                />
              ))}
            {item.type === 'radio' &&
              item.fields.map((field) => (
                <Radio
                  name={item.name}
                  label={field.label}
                  key={field.name}
                  id={field.name}
                  labelFor={field.name}
                  value={field.name}
                  defaultChecked={field.name === values[item.name]}
                  onChange={() => handleChange(item.name, field.name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>

      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilter}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
};

export default ExploreSidebar;
