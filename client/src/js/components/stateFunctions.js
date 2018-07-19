export function handleToggle(e) {
  const target = e.target.id;
  if (target === 'linkedInToggleButton') {
    this.setState({linkedInToggleStatus: !this.state.linkedInToggleStatus});
  } else if (target === 'facebookToggleButton') {
    //FB TOGGLE CODE CAN BE ADDED HERE
  }
}
