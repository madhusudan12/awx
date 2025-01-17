import React, { Component, Fragment } from 'react';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { Route, withRouter, Switch } from 'react-router-dom';

import { Config } from '@contexts/Config';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

import { TemplateList } from './TemplateList';
import Template from './Template';

class Templates extends Component {
  constructor(props) {
    super(props);
    const { i18n } = this.props;

    this.state = {
      breadcrumbConfig: {
        '/templates': i18n._(t`Templates`),
      },
    };
  }

  setBreadCrumbConfig = template => {
    const { i18n } = this.props;
    if (!template) {
      return;
    }
    const breadcrumbConfig = {
      '/templates': i18n._(t`Templates`),
      [`/templates/${template.type}/${template.id}`]: `${template.name}`,
      [`/templates/${template.type}/${template.id}/details`]: i18n._(
        t`Details`
      ),
      [`/templates/${template.type}/${template.id}/edit`]: i18n._(
        t`Edit Details`
      ),
    };
    this.setState({ breadcrumbConfig });
  };

  render() {
    const { match, history, location } = this.props;
    const { breadcrumbConfig } = this.state;
    return (
      <Fragment>
        <Breadcrumbs breadcrumbConfig={breadcrumbConfig} />
        <Switch>
          <Route
            path={`${match.path}/:templateType/:id`}
            render={({ match: newRouteMatch }) => (
              <Config>
                {({ me }) => (
                  <Template
                    history={history}
                    location={location}
                    setBreadcrumb={this.setBreadCrumbConfig}
                    me={me || {}}
                    match={newRouteMatch}
                  />
                )}
              </Config>
            )}
          />
          <Route path={`${match.path}`} render={() => <TemplateList />} />
        </Switch>
      </Fragment>
    );
  }
}

export { Templates as _Templates };
export default withI18n()(withRouter(Templates));
