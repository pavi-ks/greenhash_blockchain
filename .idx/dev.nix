{ pkgs }: {
    # nixpkgs channel.
    channel = "stable-24.05";
    
    # Enable Docker
    services.docker.enable = true;

    packages = [
        pkgs.docker-compose
        pkgs.python312Full
    ];

    env = { };

    idx = {
        extensions = [
            "GitHub.github-vscode-theme"
        ];

        previews = {
            enable = true;
            previews = { };
        };

        workspace = {
            onCreate = {
            default.openFiles = [ "README.md"];
            };
            onStart = { };
        };
    };
}