import React from 'react';
import PageTitle from './PageTitle';

export default function PageHeading(props) {
  return (
  <div className="page-heading-container">
     <PageTitle title={props.title}></PageTitle>
     <p className="page-heading-paragraph">
     {props.children}
     </p>
  </div>
  );
}
