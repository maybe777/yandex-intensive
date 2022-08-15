import TestRenderer from 'react-test-renderer'
import {Provider} from "react-redux";
import store from "../../redux/store";
import ChiefCook from "../chief-cook/chief-cook";


describe('Общая проверка компонента Конструктор', () => {
    test('должен соответствовать снапшоту', () => {
            const rendererValue = TestRenderer.create(
                <Provider store={store}>
                    <ChiefCook/>
                </Provider>
            );
            expect(rendererValue).toMatchSnapshot();
        }
    )
})