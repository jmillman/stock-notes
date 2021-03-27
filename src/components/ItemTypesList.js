import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';

import {
    Container,
    Button,
    Segment,
    Table,
    Message,
  } from 'semantic-ui-react';

function ItemTypesList() {
    const [state, , api] = useContext(GlobalContext);
    const [formStatus, setFormStatus] = useState(null);

    async function callback(result) {
        if(result.status === 'error') {
            setFormStatus({status: result.status, message: result.message});
        }
    }

    function handleClickDelete(id) {
        api.deleteItemTypeFromApp(id, callback);
    }

    function getItemTypeDisplay(itemType) {
        return (
            <Table definition>
                <Table.Body>
                    <Table.Row>
                    <Table.Cell width={2}>Name</Table.Cell>
                    <Table.Cell>{itemType.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>dataType_1</Table.Cell>
                    <Table.Cell>{itemType.dataType_1}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>dataName_1</Table.Cell>
                    <Table.Cell>{itemType.dataName_1}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>userid</Table.Cell>
                    <Table.Cell>{itemType.userId}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>            
        );
    }

    return (
        <>
            <Container>
                <Segment.Group>
                    {Object.keys(state.itemTypes).map((itemTypeId) => {
                        const itemType = state.itemTypes[itemTypeId];
                        return (
                            <Segment key={itemType.id}>
                                {getItemTypeDisplay(itemType)}
                                <Button negative
                                    key={itemType.id}
                                    onClick={() => handleClickDelete(itemType.id)}
                                >
                                    Delete
                                </Button>
    
                                {formStatus && formStatus.status ? 
                                    <Message
                                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                                    content={formStatus && formStatus.message}
                                    />
                                : null}

                            </Segment>
                        );
                    })}
                </Segment.Group>
            </Container>
        </>
    );
}

export default ItemTypesList;
  