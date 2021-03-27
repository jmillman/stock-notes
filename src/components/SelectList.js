import React from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    Select,
  } from 'semantic-ui-react';

function SelectList(props) {
    const pulldownOptions = props.optionItems.map((item) => {
        return {
            key: item.id,
            text: item[props.textKey],
            value: item.id,
        };
    });

    return(
        <Form.Field>
                <Select
                    fluid
                    placeholder={props.placeholder}
                    options={pulldownOptions}
                    value={props.selected}
                    onChange={(e, data)=>{
                        props.callback(data.value)
                    }}
                />
        </Form.Field>
    );
}

SelectList.propTypes = {
    callback: PropTypes.func.isRequired,
    optionItems: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    textKey: PropTypes.string.isRequired,
};

export default SelectList;