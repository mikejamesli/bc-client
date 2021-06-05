import React, { useState, useEffect, useContext } from 'react'
import { Router, Link, Redirect } from '@reach/router'
import Home from './Home'
import Home2 from './Home2'
import Home3 from './Home3'
import { useSubstrate } from './substrate-lib';
import { web3FromSource } from '@polkadot/extension-dapp';
import utils from './substrate-lib/utils';
import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';

function Layout() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [accountSelected, setAccountSelected] = useState('');
  const { api, apiState, keyring, keyringState, apiError } = useSubstrate();

    useEffect(() => {
        // Get the list of accounts we possess the private key for
        if (keyring) {
            const keyringOptions = keyring.getPairs().map(account => ({
                key: account.address,
                value: account.address,
                text: account.meta.name.toUpperCase(),
                icon: 'user'
            }));
            
            const initialAddress =
                keyringOptions.length > 0 ? keyringOptions[0].value : '';
                setAccountAddress(initialAddress);
                setAccountSelected(initialAddress);
        }
    }, [keyring]);

  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected }
    } = accountPair;
    let fromAcct;

    // signer is from Polkadot-js browser extension
    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      api.setSigner(injected.signer);
    } else {
      fromAcct = accountPair;
    }

    return fromAcct;
  };

  const isNumType = type =>
  utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

const transformParams = (paramFields, inputParams, opts = { emptyAsNull: true }) => {
  // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
  //   Otherwise, it will not be added
  const paramVal = inputParams.map(inputParam => {
    // To cater the js quirk that `null` is a type of `object`.
    if (typeof inputParam === 'object' && inputParam !== null && typeof inputParam.value === 'string') {
      return inputParam.value.trim();
    } else if (typeof inputParam === 'string') {
      return inputParam.trim();
    }
    return inputParam;
  });
  const params = paramFields.map((field, ind) => ({ ...field, value: paramVal[ind] || null }));

  return params.reduce((memo, { type = 'string', value }) => {
    if (value == null || value === '') return (opts.emptyAsNull ? [...memo, null] : memo);

    let converted = value;

    // Deal with a vector
    if (type.indexOf('Vec<') >= 0) {
      converted = converted.split(',').map(e => e.trim());
      converted = converted.map(single => isNumType(type)
        ? (single.indexOf('.') >= 0 ? Number.parseFloat(single) : Number.parseInt(single))
        : single
      );
      return [...memo, converted];
    }

    // Deal with a single value
    if (isNumType(type)) {
      converted = converted.indexOf('.') >= 0 ? Number.parseFloat(converted) : Number.parseInt(converted);
    }
    return [...memo, converted];
  }, []);
};

const loader = text =>
<Dimmer active>
  <Loader size='small'>{text}</Loader>
</Dimmer>;

const message = err =>
<Grid centered columns={2} padded>
  <Grid.Column>
    <Message negative compact floating
      header='Error Connecting to Substrate'
      content={`${JSON.stringify(err, null, 4)}`}
    />
  </Grid.Column>
</Grid>;

if (apiState === 'ERROR') return message(apiError);
else if (apiState !== 'READY') return loader('Connecting to Substrate');

if (keyringState !== 'READY') {
return loader('Loading accounts (please review any extension\'s authorization)');
}

  return (
    <>
        <div>
            <Router style={{ height: '100%' }}>
            <Home path="/" />
            <Home2 path="/home2" getFromAcct={getFromAcct} transformParams={transformParams} />
            <Home3 path="/home3" />
            </Router>
        </div>
        </>
  )
}

export default Layout
