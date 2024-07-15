import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/434185904_1607445900005565_2096330530224373146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGo7sFxLHlBT3Pe3lN4r137DTruw4HYkIgNOu7DgdiQiM9PE5EHj8EaJyU5WnJEzRu6siZMNQtWZPZlMfiQw6eo&_nc_ohc=wBA8qA9LybAQ7kNvgE27O9S&_nc_ht=scontent.fhan14-3.fna&oh=00_AYAlg0Ryu4vXapvuQ1KFtONXV8trztLGAejDeChzs0CD-Q&oe=669A8983"
                alt=""
              />
              <span>Cobham</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/434185904_1607445900005565_2096330530224373146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGo7sFxLHlBT3Pe3lN4r137DTruw4HYkIgNOu7DgdiQiM9PE5EHj8EaJyU5WnJEzRu6siZMNQtWZPZlMfiQw6eo&_nc_ohc=wBA8qA9LybAQ7kNvgE27O9S&_nc_ht=scontent.fhan14-3.fna&oh=00_AYAlg0Ryu4vXapvuQ1KFtONXV8trztLGAejDeChzs0CD-Q&oe=669A8983"
                alt=""
              />
              <p>
                <span>Cobham</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item-online">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/434185904_1607445900005565_2096330530224373146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGo7sFxLHlBT3Pe3lN4r137DTruw4HYkIgNOu7DgdiQiM9PE5EHj8EaJyU5WnJEzRu6siZMNQtWZPZlMfiQw6eo&_nc_ohc=wBA8qA9LybAQ7kNvgE27O9S&_nc_ht=scontent.fhan14-3.fna&oh=00_AYAlg0Ryu4vXapvuQ1KFtONXV8trztLGAejDeChzs0CD-Q&oe=669A8983"
                alt=""
              />
              <div className="online" />
              <span>Cobham</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
