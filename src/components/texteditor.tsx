import React, { FunctionComponent } from 'react';
import { encode, decode } from 'morsee';

import { compareInput } from '../utils/helper';

const TextEditor: FunctionComponent<{
  onChangeHandler?: React.Dispatch<React.SetStateAction<string>>;
}> = ({ onChangeHandler }) => {
  return (
    <textarea
      placeholder="Insert your text/code morsee here"
      rows={20}
      cols={40}
      id="textInput"
      onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
        compareInput(evt.currentTarget.value)
          ? onChangeHandler(decode(evt.currentTarget.value))
          : onChangeHandler(encode(evt.currentTarget.value))
      }
    />
  );
};

export default TextEditor;
