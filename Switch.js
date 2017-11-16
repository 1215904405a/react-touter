function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import invariant from 'invariant';
import matchPath from './matchPath';

/**
 * The public API for rendering the first <Route> that matches.
 *  有多个匹配只取第一个匹配上的
 */

var Switch = function(_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    invariant(this.context.router, 'You should not use <Switch> outside a <Router>');
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
      child = void 0;
    React.Children.forEach(children, function(element) {
      //检测是否为dom
      if (!React.isValidElement(element)) return;

      var _element$props = element.props,
        pathProp = _element$props.path,
        exact = _element$props.exact, //精确匹配
        strict = _element$props.strict, //严格匹配后面'/'有无
        sensitive = _element$props.sensitive,
        from = _element$props.from;

      var path = pathProp || from;

      if (match == null) { //一旦第一个匹配上 后面不在执行
        child = element;
        match = path ? matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }) : route.match;
      }
    });

    return match ? React.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(React.Component);

Switch.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default Switch; 