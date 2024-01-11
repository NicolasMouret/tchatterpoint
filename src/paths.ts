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
  publicProfile(userId: string) {
    return `/profil/${userId}`
  }
}

export default paths