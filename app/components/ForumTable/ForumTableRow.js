import React from 'react';
import { BrowserRouter, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router-dom';

import ForumTableStyles from "./ForumTableStyles";

class ForumTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            rowIndex: this.props.rowIndex,
            discussionPreview: this.props.discussionPreview
        };
    }

    /**
     * Renders cell in the forum table that includes details about the topic for the corresponding discussion
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createTopicCell(i, cellData) {
        const cellStyle = Object.assign({}, ForumTableStyles.forumTableCellStyle, {width: "70%"});
        
        let baseUrl = this.state.match.url;
        if (baseUrl.charAt(baseUrl.length - 1) == '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }

        return (
            <td key={"cell-" + i} style={cellStyle}>
                <Link to={`${baseUrl}/${cellData.discussion.replace(" ", "").toLowerCase()}`} style={ForumTableStyles.discussionStyle}>{cellData.discussion}</Link>
                <br />
                by <a href="#" style={ForumTableStyles.cellLinkStyle}>{cellData.author}</a>
            </td>
        );
    }

    /**
     * Renders cell in the forum table that includes details about the last comment for the corresponding discussion
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createLastCommentCell(i, cellData) {
        const cellStyle = Object.assign({}, ForumTableStyles.forumTableCellStyle, {width: "20%"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.date.toLocaleString()}
                <br />
                by <a href="#" style={ForumTableStyles.cellLinkStyle}>{cellData.author}</a>
            </td>
        );
    }

    /**
     * Renders cell in the forum table that includes details about the replies for the post
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createRepliesCell(i, cellData) {
        const cellStyle = Object.assign({}, ForumTableStyles.forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfReplies}
            </td>
        );
    }

    /**
     * Renders cell in the forum table that includes details about the views for the post
     * @param   {number}            i           Index of cell per row of the forum table used for defining the cell key
     * @param   {any}               cellData    Forum data associated for an individual cell in the forum table
     * @return  {React.Component}               Rendered component
     */
    createViewsCell(i, cellData) {
        const cellStyle = Object.assign({}, ForumTableStyles.forumTableCellStyle, {width: "5%", textAlign: "center"});
        return (
            <td key={"cell-" + i} style={cellStyle}>
                {cellData.numberOfViews}
            </td>
        );
    }

    /**
     * Renders all cells that populate a row in a forum table
     * @return  {React.Component}   Rendered component
     */
    createCells() {
        const cells = [];
        cells.push(
            this.createTopicCell(0, this.state.discussionPreview.discussion),
            this.createLastCommentCell(1, this.state.discussionPreview.lastComment),
            this.createRepliesCell(2, this.state.discussionPreview.replies),
            this.createViewsCell(3, this.state.discussionPreview.views)
        );
        return cells;
    }

    /**
     * Renders a row component in forum table
     * @return  {React.Component}   Rendered component
     */
    render() {
        return <tr style={this.state.rowIndex % 2 == 0 ? ForumTableStyles.forumTableRowEvenStyle : ForumTableStyles.forumTableRowOddStyle}>{this.createCells()}</tr>;
    }
}

module.exports = withRouter(ForumTableRow);