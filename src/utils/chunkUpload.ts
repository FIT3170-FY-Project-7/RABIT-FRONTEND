import api from '../api'

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
