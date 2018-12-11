import PropTypes from 'prop-types';
import React from 'react';

import Header from 'app/components/organizations/header';
import HeaderItemPosition from 'app/components/organizations/headerItemPosition';
import HeaderSeparator from 'app/components/organizations/headerSeparator';
import MultipleEnvironmentSelector from 'app/components/organizations/multipleEnvironmentSelector';
import MultipleProjectSelector from 'app/components/organizations/multipleProjectSelector';
import SentryTypes from 'app/sentryTypes';
import TimeRangeSelector from 'app/components/organizations/timeRangeSelector';

// eslint-disable-next-line no-unused-vars
const {onChange, onUpdate, ...TimeRangeSelectorPropTypes} = TimeRangeSelector.propTypes;

class GlobalSelectionHeader extends React.PureComponent {
  static propTypes = {
    organization: SentryTypes.Organization,

    /**
     * List of projects to display in project selector
     */
    projects: PropTypes.arrayOf(SentryTypes.Project),

    /**
     * Currently selected values(s)
     */

    // List of project ids
    project: PropTypes.arrayOf(PropTypes.number),
    // List of environment strings
    environment: PropTypes.arrayOf(PropTypes.string),
    ...TimeRangeSelectorPropTypes,

    showEnvironmentSelector: PropTypes.bool,

    // Callbacks
    onChangeProjects: PropTypes.func,
    onUpdateProjects: PropTypes.func,
    onChangeEnvironments: PropTypes.func,
    onUpdateEnvironments: PropTypes.func,
    onChangeTime: PropTypes.func,
    onUpdateTime: PropTypes.func,
  };

  static defaultProps = {
    showEnvironmentSelector: true,
  };

  render() {
    const {
      className,
      organization,
      projects,
      project,
      environment,
      relative,
      start,
      end,
      utc,
      showAbsolute,
      showRelative,
      showEnvironmentSelector,
      onChangeProjects,
      onUpdateProjects,
      onChangeEnvironments,
      onUpdateEnvironments,
      onChangeTime,
      onUpdateTime,
    } = this.props;

    return (
      <Header className={className}>
        <HeaderItemPosition>
          <MultipleProjectSelector
            organization={organization}
            projects={projects}
            value={project}
            onChange={onChangeProjects}
            onUpdate={onUpdateProjects}
          />
        </HeaderItemPosition>

        {showEnvironmentSelector && (
          <React.Fragment>
            <HeaderSeparator />
            <HeaderItemPosition>
              <MultipleEnvironmentSelector
                organization={organization}
                value={environment}
                onChange={onChangeEnvironments}
                onUpdate={onUpdateEnvironments}
              />
            </HeaderItemPosition>
          </React.Fragment>
        )}

        <HeaderSeparator />
        <HeaderItemPosition>
          <TimeRangeSelector
            showAbsolute={showAbsolute}
            showRelative={showRelative}
            relative={relative}
            start={start}
            end={end}
            utc={utc}
            onChange={onChangeTime}
            onUpdate={onUpdateTime}
          />
        </HeaderItemPosition>
      </Header>
    );
  }
}
export default GlobalSelectionHeader;
