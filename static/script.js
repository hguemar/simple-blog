window.addEventListener('load', async () => {

    let deleteButton = document.getElementById('delete-button');

    async function removePost() {
        let params = {
            method: 'DELETE',
            mode: 'cors'
        }
        await fetch(document.location.href, params);
        document.location.href = document.location.origin;
    }

    deleteButton.addEventListener('click', removePost);
});