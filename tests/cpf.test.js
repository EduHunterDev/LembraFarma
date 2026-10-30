import assert from 'node:assert/strict';
import { mascararCPF, validarCPF } from '../src/utils/cpf.js';

assert.equal(mascararCPF('52998224725'), '529.982.247-25');
assert.equal(mascararCPF('5299'), '529.9');
assert.equal(mascararCPF('529982247259999'), '529.982.247-25');

assert.equal(validarCPF('529.982.247-25'), true);
assert.equal(validarCPF('529.982.247-26'), false);
assert.equal(validarCPF('111.111.111-11'), false);
assert.equal(validarCPF('52998224725'), false);
assert.equal(validarCPF(''), false);

console.log('cpf: ok');
