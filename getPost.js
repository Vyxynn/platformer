const postContent = document.getElementById('postContent');
const actor = 'vyxynn.bsky.social';
const limit = 1;
const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=${limit}`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const latestPost = data.feed[0];
    if (latestPost && latestPost.post) {
        const postUri = latestPost.post.uri;
        const postCid = latestPost.post.cid;
        const postUrl = `https://bsky.app/profile/${actor}/post/${postUri.split('/').pop()}`;
        console.log('Latest post URL:', postUrl);
        let html = `
        <blockquote class="embed" data-bluesky-uri="${postUri}" data-bluesky-cid="${postCid}">
            <p lang="en">${latestPost.post.text}<br><br>
            <a href="${postUrl}?ref_src=embed">[image or embed]</a></p>
            &mdash; ${actor} (<a href="https://bsky.app/profile/${actor}?ref_src=embed">@${actor}</a>) 
            <a href="${postUrl}?ref_src=embed">${new Date(latestPost.post.createdAt).toLocaleString()}</a>
        </blockquote>
        `;
        postContent.innerHTML = html;
      
      // Dynamically create and append the embed script
      const script = document.createElement('script');
      script.async = true;
      script.src = "https://embed.bsky.app/static/embed.js";
      script.charset = "utf-8";
      document.body.appendChild(script);
    } else {
      postContent.innerHTML = 'No posts available to display.';
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    postContent.innerText = 'An error occurred while fetching the post.';
  });