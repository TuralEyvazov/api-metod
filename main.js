const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector(".text-list");

const url = {
  Url: "http://localhost:3001/posts",
};

const postData = async () => {
  if (input.value.trim() === "") {
    return;
  } else {
    await fetch(url.Url, {
      method: "POST",
      body: JSON.stringify({
        id: `${Math.floor(Math.random() * 20)}`,
        input: input.value,
      }),
    });
  }
};

const getData = async () => {
  const response = await fetch(url.Url);
  const data = await response.json();
  data.forEach((item) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const btnBox = document.createElement("div");
    const edit = document.createElement("button");
    edit.classList.add("edit");
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = "Delete";
    remove.onclick = () => {
      deleteItem(item.id);
    };
    edit.textContent = "Edit";
    edit.onclick = () => {
      editItem(item.id);
    };
    p.textContent = item.input;
    btnBox.append(edit, remove);
    li.append(p, btnBox);
    ul.append(li);
  });
};

const deleteItem = async (id) => {
  await fetch(`${url.Url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editItem = async (id) => {
  const edit = prompt("Edit etmey isterdinizmi?").trim();
  if (!edit) {
    return;
  }
  await fetch(`${url.Url}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      input: edit,
    }),
  });
};

getData();

form.addEventListener("submit", postData);
