import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface CollapsibleProps {
  title: string;
}

interface CollapsibleState {
  open: boolean;
}

export default class Collapsible extends React.Component<CollapsibleProps, CollapsibleState> {
  constructor(props: {title: string}) {
    super(props);

    this.expand = this.expand.bind(this);
    this.contract = this.contract.bind(this);

    this.state = {
      open: false,
    };
  }

  expand() {
    this.setState({ open: true });
  }

  contract() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { title, children } = this.props;
    return (
      <div>
        { open ? (
          <>
            <button
              type="button"
              className="hover:underline cursor-pointer text-left text-sm text-blue-400"
              onClick={this.contract}
            >
              {title}
              [-]
            </button>
            <div className="overflow-hidden mx-8 max-h-36 transition-all duration-100 ease-linear">
              {children}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="hover:underline cursor-pointer text-left text-sm text-blue-400"
              onClick={this.expand}
            >
              {title}
              [+]
            </button>
            <div className="overflow-hidden mx-8 max-h-0 transition-all duration-100 ease-linear">
              {children}
            </div>
          </>
        ) }
      </div>
    );
  }
}
