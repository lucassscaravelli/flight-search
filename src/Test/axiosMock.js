import axios from 'axios';

class AxiosMock {
  get() {
    return this;
  }

  then(sucessCallback) {
    this.successCallback = sucessCallback;
    return this;
  }

  catch(failCallback) {
    this.failCallback = failCallback;
    return this;
  }

  onSuccess(data) {
    this.successCallback(data);
  }

  onFail(data) {
    this.failCallback(data);
  }
}

export const mockAxiosAndGenerateSpies = () => {
  const mockAxios = new AxiosMock();

  const spyOnGet = spyOn(axios, 'get').and.callFake(() => mockAxios);
  const spyOnThen = spyOn(mockAxios, 'then').and.callThrough();
  const spyOnCatch = spyOn(mockAxios, 'catch').and.callThrough();

  const callThen = data => mockAxios.onSuccess(data);
  const callCatch = data => mockAxios.failCallback(data);

  return {
    callThen,
    callCatch,
    spyOnGet,
    spyOnThen,
    spyOnCatch,
  };
};
