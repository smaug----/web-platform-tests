//META: script=helper.js

function should_fail(p) {
  return p.then(
    () => Promise.reject(),
    () => {});
}

const same_origin =
    '{{location[server]}}/html/semantics/scripting-1/the-script-element/layered_api/fallback.js';

const cross_origin_cors =
    'https://{{domains[www1]}}:{{ports[https][0]}}/html/semantics/scripting-1/the-script-element/layered_api/fallback_cors.js';

const cross_origin =
    'https://{{domains[www1]}}:{{ports[https][0]}}/html/semantics/scripting-1/the-script-element/layered_api/fallback.js';

promise_test(() => import('std:blank'), 'blank');

promise_test(() => import('std:blank|' + same_origin),
  'blank with fallback (same-origin)');

promise_test(() => import('std:blank|' + cross_origin_cors),
  'blank with fallback (cross-origin)');

promise_test(() => import('std:blank|' + cross_origin),
  'blank with fallback (cross-origin w/o CORS headers)');

promise_test(() => import('std:blank|http://:invalid-url'),
  'blank with fallback (invalid URL)');

promise_test(
  () => expect_fallback_promise(import('std:none|' + same_origin)),
  'fallback (same-origin)');

promise_test(
  () => expect_fallback_promise(import('std:none|' + cross_origin_cors)),
  'fallback (cross-origin)');

promise_test(
  () => should_fail(import('std:none|' + cross_origin)),
  'fallback (cross-origin w/o CORS headers)');

promise_test(() => should_fail(import('std:none|http://:invalid-url')),
  'fallback (invalid URL)');

promise_test(() => should_fail(import('std:none')),
  'non-supported Layered API with no fallback');

promise_test(() => should_fail(import('std:none|fallback.js')),
  'fallback (relative URL)');

promise_test(() => should_fail(import('std:none|./fallback.js')),
  'fallback (relative specifier)');
