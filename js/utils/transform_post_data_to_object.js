// transform_post_data_to_object.js
export function transformPostData(post) {
  return {
    id: post.id,
    author: post.author,
    body: post.body,
    comments: post.comments || [],
    created: post.created,
    media: post.media || null,
    reactions: post.reactions || [],
    tags: post.tags || [],
    title: post.title,
    updated: post.updated,
    _count: {
      comments: post._count.comments || 0,
      reactions: post._count.reactions || 0,
    },
  };
}
