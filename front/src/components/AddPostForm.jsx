import { useDispatch } from 'react-redux';
import { createPost } from '../store/slices/postSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css';

import FroalaEditor from 'react-froala-wysiwyg';

export const AddPostForm = ({ currentUser }) => {
	const navigate = useNavigate();

	const [postData, setPostData] = useState({
		postTitle: '',
		postText: '',
		postAuthor: currentUser.name,
	});
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('POST DATA', postData);

		const result = await dispatch(createPost(postData)).unwrap();

		if (result.success) {
			navigate('/');
		}
	};

	return (
		<div className="auth-container">
			<form className="post-form" onSubmit={handleSubmit}>
				<h2 className="post-form__title">New Post</h2>

				<div className="auth-form__group">
					<label htmlFor="postTitle" className="auth-form__label">
						Title
					</label>
					<input
						className="auth-form__input"
						type="text"
						name="postTitle"
						id="postTitle"
						value={postData.postTitle}
						onChange={(e) =>
							setPostData({
								...postData,
								postTitle: e.target.value,
							})
						}
					/>
				</div>

				<div className="auth-form__group">
					<label htmlFor="postText" className="auth-form__label">
						Text
					</label>
					{/* <textarea
						className="post-form__textarea"
						name="postText"
						id="postText"
						value={postData.postText}
						onChange={(e) =>
							setPostData({
								...postData,
								postText: e.target.value,
							})
						}
					/> */}
					<FroalaEditor
						className="post-form__textarea"
						name="postText"
						id="postText"
						model={postData.postText}
						onModelChange={(context) => {
							setPostData({
								...postData,
								postText: context,
							});
						}}
						config={{
							placeholderText: '',
						}}
					/>
				</div>

				<input
					type="hidden"
					name="postAuthor"
					value={currentUser.name}
				/>

				<button type="submit" className="auth-form__button">
					Create Post
				</button>
			</form>
		</div>
	);
};
