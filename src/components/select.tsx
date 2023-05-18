import Select from 'react-select';
import styled from 'styled-components';

interface SelectInterface {
    options: Array<any>;
    value: Array<any>;
    onChange: (arg: any) => void;
}

const StyledSelect = styled(Select)`
    &.container {
        width: 250px;
    }
`;

export default ({options, value, onChange}: SelectInterface) => (
  <StyledSelect
    closeMenuOnSelect={false}
    defaultValue={[]}
    isMulti
    classNames={{
        container: () => 'container'
    }}
    placeholder="Select pokemon type to filter"
    options={options}
    value={value}
    onChange={onChange}
  />
);