(async () => {
    console.log("HI!!!");
    if (!document.cookie.split(/(?<!\\);\s/g).find(e => /user=user\d+/.test(e))) {
        user = await (await fetch("api/user")).json();
        console.log(user);
        document.cookie = "user=" + user.id;
    }

    console.log(document.cookie)
})();