import { useCallback, useEffect, useState } from 'react';
import { Close, FilterList } from '@styled-icons/material-outlined';
import { ParsedUrlQueryInput } from 'querystring';
import xor from 'lodash.xor';

import Heading from 'components/Heading';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Button from 'components/Button';
import MediaMatch from 'components/MediaMatch';

import * as S from './styles';

export type ItemProps = {
  title: string;
  name: string;
  type: 'checkbox' | 'radio' | string;
  fields: Field[];
};

type Field = {
  label: string;
  name: string;
};

type Values = ParsedUrlQueryInput;

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

  useEffect(() => {
    onFilter(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleFilterMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleRadioChange = useCallback(
    (name: string, value: boolean | string) => {
      setValues((currentValues) => ({ ...currentValues, [name]: value }));
    },
    []
  );

  const handleCheckboxChange = useCallback((name: string, value: string) => {
    setValues((currentValues) => {
      const currentList = (currentValues[name] as []) || [];

      return { ...currentValues, [name]: xor(currentList, [value]) };
    });
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
                  isChecked={(values[item.name] as string[])?.includes(
                    field.name
                  )}
                  onCheck={() => handleCheckboxChange(item.name, field.name)}
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
                  defaultChecked={
                    String(field.name) === String(values[item.name])
                  }
                  onChange={() => handleRadioChange(item.name, field.name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>

      <MediaMatch lessThan="medium">
        <S.Footer>
          <Button fullWidth size="medium" onClick={handleFilterMenu}>
            Filter
          </Button>
        </S.Footer>
      </MediaMatch>
    </S.Wrapper>
  );
};

export default ExploreSidebar;
