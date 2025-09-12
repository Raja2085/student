'use client';
import React, { Fragment } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// Import components
import PaymentsChart from './components/PaymentsChart/PaymentsChart';
import AssignmentChart from './components/Assignment-chart/Assignmentchart'; // Correct import
import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Projects</h3>
              </div>
              <div>
                <Link href="#" className="btn btn-white">Create New Project</Link>
              </div>
            </div>
          </Col>
          {ProjectsStatsData.map((item, index) => (
            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
              <StatRightTopIcon info={item} />
            </Col>
          ))}
        </Row>

        {/* Top row: Student Progress, Payment Status, Assessment Status side by side */}
        <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <TasksPerformance /> {/* Student Progress */}
          </Col>
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <PaymentsChart /> {/* Payment Status */}
          </Col>
          <Col xl={4} lg={12} md={12} xs={12}>
            <AssignmentChart /> {/* Assessment Status */}
          </Col>
        </Row>

        {/* Bottom row: Teams full width */}
        <Row className="my-6">
          <Col md={12}>
           
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
