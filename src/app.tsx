import React, { FunctionComponent } from 'react';
import { encode, decode } from 'morsee';

import TextEditor from './components/texteditor';
import MorseeContent from './components/morsecontent';

const App: FunctionComponent<{ initial?: string }> = ({ initial = '' }) => {
  const [code, setCode] = React.useState(initial);

  return (
    <div className="App">
      <h1>Code Morsee Converter</h1>
      <TextEditor onChangeHandler={setCode} />
      <MorseeContent updatedCode={code} />
    </div>
  );
};

export default App;
