import React from 'react';
import logo from '../images/sslogo2.png'
import CoursesTable from './CoursesTable';

class CoursesPage extends React.Component {

    render() {
        return (
            <div id="coursesModeTab" className="mode-page" role="tabpanel"
                 aria-label="Courses Tab" tabIndex="0">
                <CoursesTable rounds={this.props.rounds}
                              searchBarText={this.props.searchBarText}
                              searchBarOpen={this.props.searchBarOpen} />
            </div>
        );
    }   
}

export default CoursesPage;