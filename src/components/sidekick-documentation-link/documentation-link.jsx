import React from 'react';
import PropTypes from 'prop-types';

const DocumentationLink = ({slug, children}) => (
    <a
        // !!! CHANGE !!!
        // href={`https://github.com/Mixality/Sidekick#${slug}`}
        href={`https://github.com/Menersar/Sidekick#${slug}`}
        target="_blank"
        rel="noopener noreferrer"
    >
        {children}
    </a>
);
DocumentationLink.propTypes = {
    slug: PropTypes.string,
    children: PropTypes.node
};

export default DocumentationLink;
