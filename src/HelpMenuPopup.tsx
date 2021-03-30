import React from 'react';
import PropTypes from 'prop-types';

export class HelpMenuPopup extends React.Component<{}, {opened: boolean}> {
  constructor(props: {}) {
    super(props);
    this.expand = this.expand.bind(this);
    this.contract = this.contract.bind(this);
    this.state = { opened: false };
  }

  expand() {
    this.setState({ opened: true });
  }

  contract() {
    this.setState({ opened: false });
  }

  render() {
    const { opened } = this.state;
    const { children } = this.props;
    return (
      <>
        { !opened ? (
          <>
            <div
              className="z-50 rounded-lg w-12 h-12 overflow-hidden bg-transparent
                         fixed bottom-4 right-4
                         transition-all duration-500 ease-in-out"
            >
              <button
                type="button"
                className="float-right p-2
                           text-2xl text-center text-white
                           rounded-full bg-blue-500 hover:bg-blue-700"
                onClick={this.expand}
              >
                <div className="w-8 h-8 font-bold text-center">?</div>
              </button>
              <div
                className="transition-all duration-500
                           w-0 bg-transparent overflow-hidden
                           rounded mt-8 m-auto max-w-screen-md"
              >
                {children}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-none bg-gray-500 bg-opacity-75
                            overflow-y-auto max-h-full
                            fixed bottom-0 right-0
                            w-full h-full p-4
                            transition-all duration-500 ease-in-out"
            >
              <button
                type="button"
                className="float-right p-2
                           text-2xl text-center text-white
                           rounded-full bg-blue-500 hover:bg-blue-700"
                onClick={this.contract}
              >
                <div className="w-8 h-8 font-bold text-center">×</div>
              </button>
              <div className="rounded bg-white
                              m-auto my-16 md:my-8
                              w-auto max-w-screen-md
                              transition-all duration-500"
              >
                {children}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

type FormatComponents = {
  children: React.ReactNode;
};

export const HelpMenuHeader: React.StatelessComponent<FormatComponents> = (props) => {
  const { children } = props;
  return (
    <h3 className="rounded bg-blue-500 p-4
                   text-xl text-white"
    >
      {children}
    </h3>
  );
};

HelpMenuHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export const HelpMenuSubHeader: React.StatelessComponent<{}> = (props) => {
  const { children } = props;
  return (
    <h3 className="rounded bg-blue-500 p-2
                   text-lg text-white"
    >
      {children}
    </h3>
  );
};

HelpMenuSubHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
