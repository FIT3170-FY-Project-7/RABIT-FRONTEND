import api from '../api'

// Files above 300 MB return an empty string in Chrome,
// hence the chunk size is set to 100 MB which is safely
// under the limit and is large enough to not have an
// unreasonable number of chunks for large uploads.
const CHUNK_SIZE = 100 * 1024 * 1024

const chunkUpload = async (fileId: string, file: File) => {
  const requests = []
  let chunk = [0, CHUNK_SIZE]
  let chunkCount = 1
  do {
    const data = new FormData()
    data.append('fileId', fileId)
    data.append('chunkCount', chunkCount.toString())
    data.append('chunk', file.slice(...chunk))

    const request = api.post('/raw-data/chunk', data)
    requests.push(request)

    chunk = [chunk[1], chunk[1] + CHUNK_SIZE]
    chunkCount++
  } while (chunk[0] < file.size)

  return await Promise.all(requests)
}

export default chunkUpload
