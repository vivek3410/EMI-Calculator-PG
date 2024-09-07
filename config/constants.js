module.exports = {
    resStatusCode: {
        SERVER_ERROR: 504,
        SUCCESS: 200,
        CREATED: 201,
        DELETED: 200,
        SUCCESS_FETCH: 200,
        NO_RECORD_FOUND: 404,
        BAD_REQUEST: 400,
        UNABLE_FETCH: 400,
        UNABLE_CREATE: 400,
        UNABLE_DELETE: 400,
    },

    resMsg: {
        SERVER_ERROR: 'Something Went Wrong',
        SUCCESS: 'Sucessfully Done',
        CREATED: 'New Record Created',
        DELETED: 'Record Deleted',
        SUCCESS_FETCH: 'Successfully Retrived.',
        NO_RECORD_FOUND: 'No Record Found!',
        BAD_REQUEST: 'Bad Request!.',
        UNABLE_FETCH: 'Unable to fetch record(s), please try again',
        UNABLE_CREATE: 'Unable to add record(s), please try again',
        UNABLE_DELETE: 'Unable to delete record(s), please try again',
    },
}