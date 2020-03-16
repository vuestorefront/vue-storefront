import { useUser } from '<%= options.composables %>';

export default ({ redirect }) => {
  const { isAuthenticated } = useUser();
  if (isAuthenticated && !isAuthenticated.value) {
    return redirect('/');
  }
};
