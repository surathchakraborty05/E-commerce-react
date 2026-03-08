const loginUser = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', "rahul@gmail.com")

  if (data.length > 0) {
    console.log("User found:", data)
  } else {
    console.log("Invalid email")
  }
}