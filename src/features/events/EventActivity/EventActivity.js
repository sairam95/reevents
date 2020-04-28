import React, { Fragment } from 'react'
import { Header, Segment } from 'semantic-ui-react'

export const EventActivity = () => {
    return (
        <Fragment>
            <Header attached='top' content='Recent Activity'>
            </Header>
            <Segment attached>
                <p>Recent Activity</p>
            </Segment>
        </Fragment>
    )
}

export default EventActivity;