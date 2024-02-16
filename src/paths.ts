const paths = {
  home() {
    return `/`
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
  },
  privateProfile() {
    return `/mon-profil`
  },
}

export default paths