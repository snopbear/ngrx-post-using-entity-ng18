
// Unit tests for: ngOnInit










import { EditPostComponent } from '../edit-post.component';


// Mock classes


class MockStore {
  public select = jest.fn();
  public dispatch = jest.fn();
}

class MockRouter {
  public navigate = jest.fn();
}

class MockActivatedRoute {
  public paramMap = {
    subscribe: jest.fn()
  };
}

describe('EditPostComponent.ngOnInit() ngOnInit method', () => {
  let component: EditPostComponent;
  let mockStore: MockStore;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockStore = new MockStore() as any;
    mockRouter = new MockRouter() as any;
    mockActivatedRoute = new MockActivatedRoute() as any;

    component = new EditPostComponent(mockStore, mockRouter, mockActivatedRoute);
  });

  describe('Happy Path', () => {
    it('should subscribe to route parameters and log the id', () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, 'log');
      const mockParams = { id: '123' };
      mockActivatedRoute.paramMap.subscribe.mockImplementation((callback: any) => {
        callback(mockParams);
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(mockActivatedRoute.paramMap.subscribe).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('123');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing id in route parameters gracefully', () => {
      // Arrange
      const consoleSpy = jest.spyOn(console, 'log');
      const mockParams = {};
      mockActivatedRoute.paramMap.subscribe.mockImplementation((callback: any) => {
        callback(mockParams);
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(mockActivatedRoute.paramMap.subscribe).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(undefined);
    });
  });
});

// End of unit tests for: ngOnInit
