import {Buffer} from 'buffer';
import 'react-native-get-random-values';
import { randomBytes } from 'crypto';

global.crypto.getRandomValues;
global.Buffer = Buffer;
global.randomBytes = randomBytes;
