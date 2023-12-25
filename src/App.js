import { Container, Form, Button, Card, Modal } from 'react-bootstrap';
import { Trash, Camera, PencilSquare } from 'react-bootstrap-icons';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(''); 


  const handleImageChange = (event) =>{
    setImage(event.target.files[0]);
  }

  const handleCaptionChange = (event) =>{
    setCaption(event.target.value);
  }

  const handlePostSubmit = () => {
    if (selectedPost) {
      // 이미지와 캡션 수정 로직 작성
      const updatedPosts = posts.map((post) =>
        post === selectedPost ? { ...post, image, caption } : post
      );
      setPosts(updatedPosts);
    } else {
      // 새로운 글 등록 로직 작성
      setPosts([...posts, { image, caption }]);
    }

    // 초기화
    setImage(null);
    setCaption('');
    setSelectedPost(null);
    handleCloseModal();
  };

  const handleEditClick = (post) =>{
    setSelectedPost(post);
    setImage(post.image);
    setCaption(post.caption);
    handleShowModal();
  }

  // 수정 버튼
  const handleDeleteClick = (post) =>{
    const updatedPosts = posts.filter((p) => p !== post);
    setPosts(updatedPosts); 
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setImage(null);
    setCaption('');
  };  

  return (
      <div>
          <Form>
        <Form.Group controlId="image">
          <Form.Label>사진 등록</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2"
              style={{ maxWidth: '100%' }}
            />
          )}
        </Form.Group>

        <Form.Group controlId="caption">
          <Form.Label>글 등록</Form.Label>
          <Form.Control as="textarea" rows={3} value={caption} onChange={handleCaptionChange} />
        </Form.Group>

        <Button variant="primary" onClick={handlePostSubmit}>
          <PencilSquare className="mr-2" />
          {selectedPost ? '글 수정' : '글 등록'}
        </Button>
      </Form>
      <hr className="my-4" />

      <h2>일가장 글 목록</h2>

      
      {posts.map((post, index) => (
        <Card key={index} className="mt-3">
          <Card.Img variant="top" src={URL.createObjectURL(post.image)} />
          <Card.Body>
            <Card.Text>{post.caption}</Card.Text>
            <Button variant="info" onClick={() => handleEditClick(post)}>
              <PencilSquare className="mr-2" />
              수정
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => handleDeleteClick(post)}
            >
              <Trash className="mr-2" />
              삭제
            </Button>
          </Card.Body>
        </Card>
      ))}
      

      {/* 수정 모달 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost ? '글 수정' : '글 등록'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="modalImage">
              <Form.Label>사진 등록</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </Form.Group>

            <Form.Group controlId="modalCaption">
              <Form.Label>글 등록</Form.Label>
              <Form.Control as="textarea" rows={3} value={caption} onChange={handleCaptionChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handlePostSubmit}>
            {selectedPost ? '수정' : '등록'}
          </Button>
        </Modal.Footer>
      </Modal>      



      </div>    
  );
}

export default App;
