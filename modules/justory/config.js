window.apiready = () => {

	require.config({
		baseUrl: "../../modules",
		paths: {
			jquery: "jquery/jquery",
			main: "extend/main"
		}
	})

	require(['main']);

}