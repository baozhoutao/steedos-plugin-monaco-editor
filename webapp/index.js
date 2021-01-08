import React from "react";
import { render } from "react-dom";
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";

class CodeEditor extends React.Component {
  constructor() {
    super();
    const search  = new URLSearchParams(window.location.search);
    const target = search.get('target');
    this.state = {
      target: target,
      code: '',
      theme: "vs-light", //vs-dark
    };
  }

  componentDidMount(){
    let self = this;
    const { target } = this.state;
    window.addEventListener('message', function(result){
      try {
        const data = JSON.parse(result.data);
        if(data.steedosMonacoEditor){
          const code = data.steedosMonacoEditor.code ? data.steedosMonacoEditor.code: '';
          self.setState({code: code.replaceAll('\\r','\r').replaceAll('\\n','\n')});
        }
      } catch (error) {
        // console.error('message code', result.data, error);
      }
    });
    window.opener.postMessage(JSON.stringify({steedosMonacoEditor: {[target]: {init: true}}}));
  }

  onChange = (newValue) => {
    const { target } = this.state;
    window.opener.postMessage(JSON.stringify({steedosMonacoEditor: {[target]: {code: newValue}}}));
  };

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    // console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  };

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue("// code changed! \n");
    }
  };

  changeBySetState = () => {
    this.setState({ code: "// code changed by setState! \n" });
  };

  setDarkTheme = () => {
    this.setState({ theme: "vs-dark" });
  };

  setLightTheme = () => {
    this.setState({ theme: "vs-light" });
  };

  render() {
    const { code, theme } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
    };
    return (
      <div className='code-editor'>
        <br></br>
        <MonacoEditor
        language="javascript"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
        theme={theme}
      />
      </div>
    );
  }
}

const App = () => (
  <div className='code-builder'>
    <CodeEditor />
  </div>
);

render(<App />, document.getElementById("root"));
