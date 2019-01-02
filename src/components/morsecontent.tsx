import React, { FunctionComponent } from 'react';

import { compareInput } from '../utils/helper';
import {
  convertCodeToMorseeAudio,
  convertCodeToNPLAudio
} from '../utils/audioconverter';

const MorseeContent: FunctionComponent<{ updatedCode?: string }> = ({
  updatedCode = ''
}) =>
  updatedCode ? (
    <div>
      <h3>Converted Code Morsee:</h3>
      <p>{updatedCode}</p>
      <button
        onClick={(evt: React.MouseEvent<HTMLElement>) =>
          compareInput(updatedCode)
            ? convertCodeToMorseeAudio({ value: updatedCode, shouldPlay: true })
            : convertCodeToNPLAudio({ value: updatedCode, shouldPlay: true })
        }>
        Play it
      </button>
    </div>
  ) : null;

export default MorseeContent;
