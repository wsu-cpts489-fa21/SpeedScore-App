import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CoursesTable extends React.Component {

  renderTable = () => {
    const table = [];
    for (let r = 0; r < this.props.rounds.length; ++r) {
      if ((this.props.rounds[r].course.toLowerCase().indexOf(this.props.searchBarText.toLowerCase()) > -1))
        table.push(
          <tr key={r}>
            <td>{this.props.rounds[r].date.substring(0,10)}</td>
            <td>{this.props.rounds[r].course}</td>
            <td><button id={"coursesEditBtn" + r}>
                  <FontAwesomeIcon icon="eye"/> 
                  <FontAwesomeIcon icon="edit"/> 
                </button>
            </td>
            <td><button id={"coursesDeleteBtn" + r}>
                  <FontAwesomeIcon icon="trash"/>
                </button>
            </td>
          </tr> 
        );
      }

      // If no course exist according to the search text.
      if (table.length == 0)
      {
        table.push(
          <tr>
            <td colSpan="5" scope="rowgroup"><i>No Courses found</i></td>
          </tr>
        );
      }

    return table;
  }

    render() {
      return(
        <div id="coursesModeTab" className="mode-page" role="tabpanel"
            aria-label="Courses Tab" tabIndex="0" style={{paddingTop: '0px'}}>
        <h1 className="mode-page-header">Courses</h1>
        <table id="coursesTable" className="table table-hover caption-top">
          <caption id="coursesTableCaption" aria-live="polite">
            {"Table displaying " + this.props.rounds.length  + " speedgolf course" + 
              (this.props.rounds.length !== 1 ? "s" : "")}
          </caption>
          <thead className="table-light">
            <tr>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by date">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Date
            </th>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by course">
                  <FontAwesomeIcon icon="sort" /> 
                </button>Course
            </th>
            <th scope="col" className="cell-align-middle">
              View/Edit...
            </th>
            <th scope="col" className="cell-align-middle">
              Delete
            </th>
            </tr>
          </thead>
          <tbody>
            {this.props.rounds === null || this.props.rounds.length === 0 ?
              <tr>
                <td colSpan="5" scope="rowgroup"><i>No Courses logged</i></td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>        
      </div>
      );
    }   
}

export default CoursesTable;