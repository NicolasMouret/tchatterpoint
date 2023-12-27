const paths = {
  home() {

  },
  topicShow(topicSlug: string) {
    return `/cantina/topics/${topicSlug}`
  },
  postCreate(topicSlug: string) {
    return `/cantina/topics/${topicSlug}/posts/create`
  },
  postShow(topicSlug: string, postId: string) {
    return `/cantina/topics/${topicSlug}/posts/${postId}`

  },
}

export default paths