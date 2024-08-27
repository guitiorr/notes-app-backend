const { nanoid } = require("nanoid");
const notes = require("./notes");

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if(index !==  -1){
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: `Note ${id} deleted successfully`,
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: `Note ${id} failed to be deleted because it was not found`,
    });
    response.code(404);
    return response;
}

const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

   const index = notes.findIndex((note) => note.id === id);

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: `note ${id} successfuly updated`,
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: `note ${id} failed to be updated, ID is not found`
    });
    response.code(404);
    return response;
}

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0]; //check undefined note

  if (note !== undefined) {
    const response = h.response({
        status: 'success',
        data: {
            note,
        },
    });
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "note not found",
    });
    response.code(404);
    return response;
  }
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0; //menentukan apakah newNote sudah masuk ke dalam array notes

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Note successfully added",
      data: {
        noteId: id,
      },
    });
    //response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
    response.header("Access-Control-Allow-Origin", "*");
    response.code(201);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Failed to add new note",
    });
    response.code(500);
    return response;
  }
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
