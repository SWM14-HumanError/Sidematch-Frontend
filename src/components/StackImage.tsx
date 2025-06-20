import {useState, useRef, useEffect} from 'react';
import * as Sentry from '@sentry/browser';
import {ISimpleTechStack, ITechStack} from '@constant/interfaces.ts';
import {useStacks} from '@constant/stackList.ts';
import {DefaultStack} from '@constant/initData.ts';

interface IStackImage {
  stack: ISimpleTechStack | ITechStack;
  hasTooltip?: boolean;
}

const STACK_URL = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const NON_STACK_IMAGE = '/ImageNotFound.svg';

function StackImage({stack, hasTooltip=true}: Readonly<IStackImage>) {
  const [url, setUrl] = useState<string>();
  const stackUrlGenerator = useRef<Generator|undefined>();
  const {data: StackList} = useStacks();

  useEffect(() => {
    if (!StackList) return;
    
    stackUrlGenerator.current = getStackUrl(StackList, stack);
    setUrl(stackUrlGenerator.current.next().value);
  }, [StackList, stack]);

  if (!StackList) {
    return <div className='stack_layout' />;
  }


  function loadOtherImage() {
    Sentry.captureException(new Error(`스택 이미지를 불러오지 못했습니다. 스택명: ${stack.tagName}`));
    setUrl(stackUrlGenerator.current?.next().value && NON_STACK_IMAGE);
  }

  return (
    <div className='stack_layout'>
      <img src={url}
           alt={stack.tagName}
           onError={loadOtherImage}
           role='presentation'
           onClick={e => e.stopPropagation()}/>
      { hasTooltip && (
        <span>{stack.tagName}</span>
      )}
    </div>
  );
}

function* getStackUrl(stackList: ITechStack[], stack: IStackImage['stack']) {
  if (stack.url)
    yield stack.url;

  if ('tagID' in stack && stack.tagID === DefaultStack.tagID) {
    yield NON_STACK_IMAGE;
  }

  // search가 가능한 경우
  const name = stack.tagName.toLowerCase().replace(/\./g, '');
  const searched = stackList.find(stack => stack.tagName === name);

  if (searched)
    yield STACK_URL + `/${searched.tagName}/${searched.tagName}-${searched.svg}.svg`;

  // search가 불가능한 경우 -> 임의로 생성
  yield STACK_URL + `/${name}/${name}-original.svg`;
  yield STACK_URL + `/${name}/${name}-plain.svg`;
  yield NON_STACK_IMAGE;
}

export default StackImage;