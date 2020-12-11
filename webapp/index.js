import React from "react";
import { render } from "react-dom";
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";

class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '',
      theme: "vs-light",
    };
  }

  componentDidMount(){
    let self = this;
    window.addEventListener('message', function(result){
      let code = result.data;
      console.log('message code', code);
      if(typeof code === 'string'){
        self.setState({code: code});
      }
    })
  }

  onChange = (newValue) => {
    window.opener.postMessage(newValue)
    console.log("onChange", newValue); // eslint-disable-line no-console
  };

  editorDidMount = (editor) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
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
