import { data } from './data';

addEventListener('fetch', (event: any) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) =>
        new Response(err.stack, {
          status: 500,
        })
    )
  );
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

function handleOptions(request: any) {
  let headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    let respHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers'
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    });
  }
}

function createResponse(data: Record<string, any> | string) {
  const response = new Response(JSON.stringify(data));
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  return response;
}

async function handleRequest(request: any) {
  let response: any;

  if (request.method === 'OPTIONS') {
    response = handleOptions(request);
  } else {
    const { pathname } = new URL(request.url);

    if (request.method === 'GET' && pathname === '/up') {
      response = createResponse({ message: 'Service is up and running...' });
    }

    if (request.method === 'POST' && pathname === '/update') {
      try {
        const content = await request.json();

        response = createResponse({ response: content });
      } catch (error) {
        throw error;
      }
    }

    if (request.method === 'GET') {
      response = createResponse({ response: data });
    }
  }
  return response;
}
