'use client'
import React, { Fragment } from "react";
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// Import components
import PaymentsChart from './components/PaymentsChart/PaymentsChart';
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

                <ActiveProjects />

                {/* Top row: Student Progress and Payment Status side by side */}
                <Row className="my-6">
                    <Col xl={6} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                        <TasksPerformance /> {/* Student Progress first */}
                    </Col>
                    <Col xl={6} lg={12} md={12} xs={12}>
                        <PaymentsChart /> {/* Payment Status second */}
                    </Col>
                </Row>

                {/* Bottom row: Teams full width */}
                <Row className="my-6">
                    <Col md={12}>
                        <Teams />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Home;
