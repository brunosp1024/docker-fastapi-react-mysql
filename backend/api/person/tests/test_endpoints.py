import json
import pytest

from api.person.models.person import Pessoa


class TestPersonEndpoints:

    endpoint = '/api/pessoas'

    @pytest.mark.parametrize('instance', [('instance_person_1'), ('instance_person_2')])
    def test_create_new_person(self, client, instance, request):
        instance = request.getfixturevalue(instance)
        response = client.post(
            self.endpoint,
            json=instance
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 201
        assert all(item in response_dict.items() for item in instance.items()) == True


    def test_list_all_persons(self, object_created, client):
        response = client.get(self.endpoint)
        assert response.status_code == 200
        assert len(json.loads(response.content)['items']) == 1


    def test_retrieve_one_person(self, client, object_created):
        url = f'{self.endpoint}/{object_created["id_pessoa"]}'
        response = client.get(url)
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in object_created.items()) == True


    def test_update_person(self, client, object_created, instance_person_1):
        instance = instance_person_1
        url = f'{self.endpoint}/{object_created["id_pessoa"]}/'
        response = client.put(url, content=json.dumps(instance))
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict['data'].items() for item in instance.items()) == True


    def test_delete(self, client, object_created):
        url = f'{self.endpoint}/{object_created["id_pessoa"]}/'
        response = client.delete(url)
        assert response.status_code == 204
        assert client.get(url).status_code == 404
