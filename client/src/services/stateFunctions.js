export function handleToggle(e) {
  const target = e.target.id;
  if (target === 'LinkedInToggleButton') {
    this.setState({ linkedInToggleStatus: !this.state.linkedInToggleStatus });
  } else if (target === 'TwitterToggleButton') {
    this.setState({ twitterToggleStatus: !this.state.twitterToggleStatus });
  }
}
